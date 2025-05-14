import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
    @IsString()
    @IsNotEmpty()
    data: string;
}