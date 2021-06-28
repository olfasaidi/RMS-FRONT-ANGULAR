import {
    AbilityBuilder,
    Ability,
    detectSubjectType,
    AbilityClass,
    InferSubjects,
} from "@casl/ability";

type Actions = "add" | "modify" | "view" | "disable" | "delete";
type Subjects =
      string
    | "media"
    | "presentation"
    | "product"
    | "project"
    | "reference"
    | "user"
    | "logs"
    | "company";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

// export function defineAbilitiesFor(role: string) {
//     const { can, rules } = new AbilityBuilder<AppAbility>();

//     switch (role) {
//         case "ROLE_SUPERADMIN":
//             can(
//                 ["add", "modify", "view", "disable", "delete"],
//                 [
//                     "media",
//                     "presentation",
//                     "product",
//                     "project",
//                     "reference",
//                     "user",
//                     "company",
//                 ]
//             );
//             can("view", "logs");
//             this._allowedRoutes = [
//                 "media",
//                 "presentation",
//                 "product",
//                 "project",
//                 "reference",
//                 "user",
//                 "company",
//                 "logs",
//             ];
//             break;

//         case "ROLE_ADMIN":
//             can(
//                 ["add", "modify", "view", "disable", "delete"],
//                 [
//                     "media",
//                     "presentation",
//                     "product",
//                     "project",
//                     "reference",
//                     "user",
//                 ]
//             );
//             can("view", "logs");
//             can(["modify", "disable", "delete", "view"], "company");
//             this._allowedRoutes = [
//                 "media",
//                 "presentation",
//                 "product",
//                 "project",
//                 "reference",
//                 "user",
//                 "company",
//                 "logs",
//             ];
//             break;

//         case "ROLE_MANAGER":
//             can(
//                 ["add", "modify", "view", "disable", "delete"],
//                 ["media", "presentation", "product", "project", "reference"]
//             );
//             can("view", "logs");
//             this._allowedRoutes = [
//                 "media",
//                 "presentation",
//                 "product",
//                 "project",
//                 "reference",
//                 "logs",
//             ];
//             break;

//         case "ROLE_EDITOR":
//             can(["modify", "view"], ["presentation", "project"]);
//             can(
//                 ["add", "modify", "view", "delete"],
//                 ["media", "product", "reference"]
//             );
//             this._allowedRoutes = [
//                 "media",
//                 "presentation",
//                 "product",
//                 "project",
//                 "reference",
//             ];
//             break;

//         case "ROLE_VIEWER":
//             can(
//                 ["view"],
//                 ["media", "presentation", "product", "project", "reference"]
//             );
//             this._allowedRoutes = [
//                 "media",
//                 "presentation",
//                 "product",
//                 "project",
//                 "reference",
//             ];
//             this._viewOnly = true;
//             break;
//         default:
//             can(
//                 ["view"],
//                 ["media", "presentation", "product", "project", "reference"]
//             );
//             this._allowedRoutes = [
//                 "media",
//                 "presentation",
//                 "product",
//                 "project",
//                 "reference",
//             ];
//             this._viewOnly = true;
//             break;
//     }

//     return rules;
// }
