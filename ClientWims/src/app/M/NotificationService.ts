import { Injectable } from '@angular/core';
import { NotificationService as KendoNotificationService } from '@progress/kendo-angular-notification';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private kendoNotificationService: KendoNotificationService) { }

    public showSuccess(message: string) {
        this.showMessage('success', message);
    }

    public showError(message: string) {
        this.showMessage('error', message);
    }

    showMessage(type: 'success' | 'warning' | 'error' | 'info', message: string) {
        this.kendoNotificationService.show({
            content: message,
            position: { horizontal: 'center', vertical: 'top' },
            hideAfter: 5000,
            animation: { duration: 400, type: 'fade' },
            type: {
                style: type,
                icon: true
            }
        });
    }
}
