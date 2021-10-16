import {MessageSnackBar} from "../entities/message-snack-bar";
import {ErrorTypeEnum} from "../entities/error-type-enum";
import {MatSnackBarConfig} from "@angular/material/snack-bar";

export default class SnackBarUtils {
  static getSnackBarConfig(message: MessageSnackBar, type: ErrorTypeEnum) {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.data = message
    snackBarConfig.horizontalPosition = 'end';
    snackBarConfig.verticalPosition = 'bottom';
    snackBarConfig.duration = 3000;
    snackBarConfig.panelClass = this.getMessageStyleClass(type);

    return snackBarConfig;
  }

  static getMessageStyleClass(type: ErrorTypeEnum): string[] {
    let styleClass: string[] = []
    switch (type) {
      case ErrorTypeEnum.ERR :
        styleClass = ['background-error'];
        break;
      case ErrorTypeEnum.INFO :
        styleClass = ['background-info'];
        break;
      case ErrorTypeEnum.WARN :
        styleClass = ['background-warning'];
        break;
      default :
        break;
    }
    return styleClass;
  }
}
