// 自定义装饰器

import { createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator((req) => req.user)