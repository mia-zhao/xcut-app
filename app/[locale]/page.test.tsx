import "@testing-library/jest-dom";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LocalePage from "./page";
import * as en from "../../messages/en.json";

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
  render(
    <MemoryRouter>
      <NextIntlClientProvider locale="en">
        <LocalePage params={{ locale: "en" }} />
      </NextIntlClientProvider>
    </MemoryRouter>
  );
  const englishContents = await screen.findByText(
    /Welcome to Your Exceptional Website/i
  );
  expect(englishContents).toBeInTheDocument();
});
