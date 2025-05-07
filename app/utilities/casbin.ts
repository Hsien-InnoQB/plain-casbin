import { Authorizer } from "casbin.js";
import { allData, modules } from "./constant";

interface Permission {
  create: string[];
  read: string[];
  update: string[];
  delete: string[];
}

export class CasbinAuth {
  private auth: Authorizer;
  private currentRole: string | null = null;

  constructor() {
    this.auth = new Authorizer("manual");
  }

  public setUser(name: string): void {
    this.auth.setUser(name);
  }

  public setPermission(userRole: string): Permission | null {
    try {
      this.currentRole = userRole;

      const storedData = JSON.parse(localStorage.getItem('roleData') || JSON.stringify(allData));
      const roleDataIndex = storedData.findIndex((role: any) => role.module === "Role");
      
      if (roleDataIndex === -1) {
        console.error("Role module not found");
        return null;
      }

      const roleIndex = storedData[roleDataIndex].data.findIndex(
        (data: any) => data.name === userRole
      );

      if (roleIndex === -1) {
        console.error(`Role ${userRole} not found`);
        return null;
      }

      const permissions: Permission = {
        read: [],
        create: [],
        update: [],
        delete: []
      };

      try {
        const strAccessControlJson = storedData[roleDataIndex].data[roleIndex].accessControl;
        const accessControlJson = JSON.parse(strAccessControlJson);

        Object.entries(accessControlJson).forEach(([module, actions]: [string, any]) => {
          if (Array.isArray(actions)) {
            actions.forEach((action: string) => {
              const actionLower = action.toLowerCase();
              permissions[actionLower as keyof Permission].push(module);
            });
          }
        });
      } catch (parseError) {
        console.error("Error parsing access control JSON:", parseError);
        return null;
      }

      this.auth.setPermission(permissions as unknown as Record<string, unknown>);
      return permissions;
    } catch (error) {
      console.error("Error setting permissions:", error);
      return null;
    }
  }

  public getCurrentRole(): string | null {
    return this.currentRole;
  }

  public can(action: 'create' | 'read' | 'update' | 'delete', resource: string): boolean {
    if (!this.currentRole) {
      return false;
    }
    try {
      const result = this.auth.permission?.check(action, resource);
      return result || false;
    } catch (error) {
      console.error(`Error checking permission for ${action} on ${resource}:`, error);
      return false;
    }
  }
}

export const casbinAuth = new CasbinAuth();
