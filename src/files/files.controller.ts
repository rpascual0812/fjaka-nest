import { Controller, Get, Post, Param, Request, Response, Body, UploadedFile, UseInterceptors, UseGuards, HttpStatus } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import * as moment from 'moment';

import { editFileName, imageFileFilter } from '../utilities/upload.utils';

@Controller('files')
export class FilesController {
    constructor(

    ){ }

    @Get('/images/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Response() res) {
        return res.sendFile(image, { root: './assets/images' });
    }

    // save log in/out with photo
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './assets/images',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async save_upload(@UploadedFile() file: any, @Request() req: any, @Response() res: any, @Body() body: any) {
        console.log('file', file);
        return res.status(HttpStatus.OK).json(file);

        // const token = req.headers.authorization.split(' ')[1]; //#IMPROVE
        // const session = await this.sessionService.find(token);
        // if(session) {
        //     const employee = await this.employeeService.find(session[0].account_pk);
        //     if(employee) {
        //         body.image = file.path;
        //         const time = await this.timelogsService.create(employee[0], body);
        //         return res.status(HttpStatus.OK).json(time[0]);
        //     }
        //     else {
        //         return res.status(HttpStatus.NOT_FOUND).json({ message: 'Employee not found' });
        //     }
        // }
        // else {
        //     return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Session Expired' });
        // }
    }
}
