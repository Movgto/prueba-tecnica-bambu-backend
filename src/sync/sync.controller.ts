import { Controller, Get, UseGuards } from "@nestjs/common";
import { SyncService } from "./sync.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiSecurity } from "@nestjs/swagger";

@Controller('sync')
export class SyncController {
    constructor(
        private _syncService: SyncService
    ) {}

    @ApiOperation({
        summary: 'Syncronizes the database',
        description: 'Gets products from the DummyJSON API and updates the database with them'
    })

    @ApiBearerAuth('JWT-auth')
    @Get()
    @UseGuards(AuthGuard())
    syncDB() {
        return this._syncService.syncDB();
    }
}