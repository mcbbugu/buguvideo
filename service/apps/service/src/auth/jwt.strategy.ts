import {Strategy, StrategyOptions, ExtractJwt}  from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        } as StrategyOptions) //加上后有提示
    }

    async validate(id){
        return await this.userModel.findById(id)
    }
}