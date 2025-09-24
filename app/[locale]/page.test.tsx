import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { MemoryRouter } from "react-router-dom";
import * as en from "../../messages/en.json";
import LocalePage from "./page";

jest.mock("next-intl", () => {
  const originalModule = jest.requireActual("next-intl");
  return {
    ...originalModule,
    useTranslations: jest.fn().mockImplementation((namespace) => {
      return createTranslator({
        locale: "en",
        messages: en,
        namespace,
      });
    }),
  };
});

jest.mock("next-intl/server", () => {
  const originalModule = jest.requireActual("next-intl/server");
  return {
    ...originalModule,
    setRequestLocale: jest.fn(),
  };
});

jest.mock("next-intl/navigation", () => {
  const originalModule = jest.requireActual("next-intl/navigation");
  const originalCreateNavigationReturn = originalModule.createNavigation();
  return {
    ...originalModule,
    createNavigation: () => ({
      ...originalCreateNavigationReturn,
      useRouter: jest.fn(),
    }),
  };
});

test("renders /en/ with English content", async () => {
  const pageJsx = await LocalePage({
    params: Promise.resolve({ locale: "en" }),
  } as { params: Promise<{ locale: string }> });

  render(
    <MemoryRouter>
      <NextIntlClientProvider locale="en">{pageJsx}</NextIntlClientProvider>
    </MemoryRouter>
  );
  const heading = await screen.findByRole("heading", {
    level: 1,
    name: /XCut/i,
  });
  expect(heading).toBeInTheDocument();
});
