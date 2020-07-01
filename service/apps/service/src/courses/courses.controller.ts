import { Controller } from '@nestjs/common';
import {Crud} from 'nestjs-mongoose-crud'
import { Course } from '@libs/db/models/course.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Course,
    routes: {
        create: false,
        update: false,
        delete: false
    }
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
    constructor(
        @InjectModel(Course) private model
    ){}
}