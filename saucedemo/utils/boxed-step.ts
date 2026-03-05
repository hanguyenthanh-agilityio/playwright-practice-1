// utils/boxed-step.ts
import { test } from "@playwright/test";

export async function boxedStep(name: string, action: () => Promise<void>) {
  await test.step(name, action, { box: true });
}
