import { Controller, Get } from "@nestjs/common";
import { SyncService } from "./sync.service";

@Controller('sync')
export class SyncController {
    constructor(
        private _syncService: SyncService
    ) {}

    @Get()
    syncDB() {
        return this._syncService.syncDB();
    }
}