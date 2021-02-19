import { AuthService } from "@/services/AuthService";
import { ServiceRegistry } from "./../ServiceRegistry";

export enum AdminMenuSection {
    ContextDelimeter = "Контент__section",
    SiteSections = "Разделы сайта",
    TopMenu = "Верхнее меню",
    FooterService = "Услуги для Футера",
    News = "Новости",
    DictDelimeter = "Справочники__section",
    ServiceType = "Виды деятельности",
    Brands = "Бренды",
    Documents = "Документы",
    Price = "Прайс-лист",
    Staffs = "Сотрудники",
    ContactPersons = "Контактные лица",
    Requets = "Заявки",
    AdminDelimeter = "Администрирование__section",
    ContactForms = "Контактные формы",
    SocialNet = "Соцсети",
    EmailServer = "Почтовый сервер",
    AccessExchange = "Обмен данными с Access",
    Logs = "Логи",
}

export class AdminMenuSectionPermissionsManager {
    static getEnumKeyByEnumValue = (val: string): string | undefined => {
        return Object.keys(AdminMenuSection).find((iter) => AdminMenuSection[iter] === val);
    };

    static getEnumValueListByEnumKeyList = (keyList: string[]): any[] => {
        return keyList.map((iter) => {
            const val = AdminMenuSectionPermissionsManager.getEnumValueByEnumKey(iter);
            return val ?? null;
        });
    };

    static getEnumValueByEnumKey = (key: string): string | null => {
        Object.keys(AdminMenuSection).forEach((iter) => {
            if (iter === key) {
                return AdminMenuSection[iter];
            }
        });
        return null;
    };

    static toString(permissions: AdminMenuSection[]) {
        return JSON.stringify(permissions);
    }

    static fromString(permissionsString: string) {
        let result: AdminMenuSection[] = [];
        try {
            const rights = JSON.parse(permissionsString);
            if (!!rights && Array.isArray(rights)) {
                result = [...rights];
            }
        } catch (err) {
            result = [];
        }
        return result;
    }

    static existsOnCurrentUser(itemName: string) {
        const perms = ServiceRegistry.instance.getService(AuthService).getSessionUser().menuPermissions;
        return perms.find((iter) => iter === itemName);
    }
}
