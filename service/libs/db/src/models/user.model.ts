import { prop, modelOptions, DocumentType } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from 'bcryptjs'

export type UserDocument = DocumentType<User> //添加智能提示

//加上时间
@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class User{
    @ApiProperty({ description: '用户名'})
    @prop()
    username: string

    @ApiProperty({ description: '密码'})
    @prop({
        select: false, //常规不展示 password
        get(val){
            return val
        },
        set(val){
            return val && hashSync(val) //加密
        }
    })
    password: string
}