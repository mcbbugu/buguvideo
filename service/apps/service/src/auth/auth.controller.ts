import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('用户')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ){}
    
    @Post('register')
    @ApiOperation({summary: '注册'})
    async register(@Body() dto: RegisterDto){
        const {username, password} = dto;
        const user = await this.userModel.create({
            username,
            password
        })
        return user;
    }

    @Post('login')
    @ApiOperation({summary: '登录'})
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument){
        return {
            token: this.jwtService.sign(String(user._id))
        }
    }

    @Get('user')
    @ApiBearerAuth() //表明这个接口可以传递 token
    @ApiOperation({summary: '获取个人信息'})
    @UseGuards(AuthGuard('jwt'))
    async user(@CurrentUser() user: UserDocument){
        return user._id;
    }
}