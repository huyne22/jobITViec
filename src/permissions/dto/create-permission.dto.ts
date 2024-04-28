import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {

    @IsNotEmpty({ message: 'name ko dc để trống' })
    name: string;

    @IsNotEmpty({ message: 'apiPath ko dc để trống' })
    apiPath: number;

    @IsNotEmpty({ message: 'method ko dc để trống' })
    method: number;

    @IsNotEmpty({ message: 'module ko dc để trống' })
    module: string;
}