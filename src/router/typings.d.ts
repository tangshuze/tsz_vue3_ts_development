
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // options
    title?: string;
    // every route must declare
    show?: boolean; //
  }
}