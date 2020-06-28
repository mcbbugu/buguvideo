import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "./course.model";

/**
 * 课时
 */
//加上时间
@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class Episode{
    @ApiProperty({ description: '课时名称'})
    @prop()
    name: string

    @ApiProperty({ description: '视频'})
    @prop()
    file: string

    @prop( {ref: 'Course'})
    course: Ref<Course>
}