import { Body, Controller, Post } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { inject } from '@angular/core';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
    private candidatesService = inject(CandidatesService);

    @Post()
    async create(@Body() createCandidateDto: any) {
        return this.candidatesService.create(createCandidateDto);
    }
}
