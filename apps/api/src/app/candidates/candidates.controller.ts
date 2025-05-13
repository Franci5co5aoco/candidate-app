import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService: CandidatesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('excel'))
    async create(
        @UploadedFile() excel: Express.Multer.File,
        @Body('data') data: string) {
        return this.candidatesService.create(data, excel);
    }
}
