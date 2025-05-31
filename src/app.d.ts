import "unplugin-icons/types/svelte";
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

type ToastTypes = "success" | "error" | "warning" | "info";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface PageData {
      flash?: { type: ToastTypes; message: string; description?: string };
    }
  }
}

export {};
