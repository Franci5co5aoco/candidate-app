import { Injectable } from '@nestjs/common';

@Injectable()
export class CandidatesService {
    create(createCandidateDto: any) {
        console.log('createCandidateDto:', createCandidateDto);
        // Here you would typically save the candidate to a database
        // For now, we'll just log it to the console
        return {
            message: 'Candidate created successfully',
            data: createCandidateDto,
        };
    }
}
