import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
    //gọi là class validator
    @IsNotEmpty({ message: 'Name ko dc để trống' })
    name: string;

    @IsNotEmpty({ message: 'address ko dc để trống' })
    address: string;

    @IsNotEmpty({ message: 'description ko dc để trống' })
    description: string;

    @IsNotEmpty({ message: 'logo ko dc để trống' })
    logo: string;
}