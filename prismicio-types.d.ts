// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type ExtrapagesDocumentDataSlicesSlice = AboutSlice;

/**
 * Content for extrapages documents
 */
interface ExtrapagesDocumentData {
  /**
   * Slice Zone field in *extrapages*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: extrapages.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ExtrapagesDocumentDataSlicesSlice> /**
   * Meta Description field in *extrapages*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: extrapages.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *extrapages*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: extrapages.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *extrapages*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: extrapages.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * extrapages document from Prismic
 *
 * - **API ID**: `extrapages`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ExtrapagesDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ExtrapagesDocumentData>,
    "extrapages",
    Lang
  >;

type HomeDocumentDataSlicesSlice =
  | SafetyTipsSectionSlice
  | EnquiresSectionSlice
  | AccessoriesDisplaySectionSlice
  | CustomerSatisfactionSectionSlice
  | ProductsOfTheWeekSlice
  | HeroSectionSlice;

/**
 * Content for home documents
 */
interface HomeDocumentData {
  /**
   * Slice Zone field in *home*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Description field in *home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *home*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

/**
 * Item in *custom-settings → navigations*
 */
export interface NavDocumentDataNavigationsItem {
  /**
   * link field in *custom-settings → navigations*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.navigations[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * label field in *custom-settings → navigations*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.navigations[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;

  /**
   * key field in *custom-settings → navigations*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.navigations[].key
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  key: prismic.KeyTextField;
}

/**
 * Item in *custom-settings → products*
 */
export interface NavDocumentDataProductsItem {
  /**
   * mainimage field in *custom-settings → products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].mainimage
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  mainimage: prismic.ImageField<never>;

  /**
   * complimentaryimage1 field in *custom-settings → products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].complimentaryimage1
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  complimentaryimage1: prismic.ImageField<never>;

  /**
   * complimentaryimage2 field in *custom-settings → products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].complimentaryimage2
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  complimentaryimage2: prismic.ImageField<never>;

  /**
   * complimentaryimage3 field in *custom-settings → products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].complimentaryimage3
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  complimentaryimage3: prismic.ImageField<never>;

  /**
   * brandname field in *custom-settings → products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].brandname
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  brandname: prismic.KeyTextField;

  /**
   * title field in *custom-settings → products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * shortdescription field in *custom-settings → products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].shortdescription
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  shortdescription: prismic.KeyTextField;

  /**
   * fulldescription field in *custom-settings → products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].fulldescription
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  fulldescription: prismic.KeyTextField;

  /**
   * price field in *custom-settings → products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[].price
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  price: prismic.KeyTextField;

  /**
   * categories field in *custom-settings → products*
   *
   * - **Field Type**: Select
   * - **Placeholder**: choose the product category
   * - **API ID Path**: nav.products[].categories
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  categories: prismic.SelectField<"newLaptops" | "usedLaptops" | "accessories">;
}

type NavDocumentDataSlicesSlice = never;

/**
 * Content for custom-settings documents
 */
interface NavDocumentData {
  /**
   * logo field in *custom-settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * Site Title field in *custom-settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.site_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  site_title: prismic.KeyTextField;

  /**
   * meta description field in *custom-settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * og image field in *custom-settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.og_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  og_image: prismic.ImageField<never>;

  /**
   * Address field in *custom-settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.address
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  address: prismic.KeyTextField;

  /**
   * RefundPolicy field in *custom-settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.refundpolicy
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  refundpolicy: prismic.LinkField;

  /**
   * DeliveryPolicy field in *custom-settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.deliverypolicy
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  deliverypolicy: prismic.LinkField;

  /**
   * TermsAndConditions field in *custom-settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.termsandconditions
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  termsandconditions: prismic.LinkField;

  /**
   * PhoneNumber field in *custom-settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.phonenumber
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  phonenumber: prismic.KeyTextField;

  /**
   * Email field in *custom-settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.email
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  email: prismic.KeyTextField;

  /**
   * navigations field in *custom-settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.navigations[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigations: prismic.GroupField<Simplify<NavDocumentDataNavigationsItem>>;

  /**
   * products field in *custom-settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.products[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  products: prismic.GroupField<Simplify<NavDocumentDataProductsItem>>;

  /**
   * Slice Zone field in *custom-settings*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: nav.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<NavDocumentDataSlicesSlice>;
}

/**
 * custom-settings document from Prismic
 *
 * - **API ID**: `nav`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<NavDocumentData>, "nav", Lang>;

export type AllDocumentTypes = ExtrapagesDocument | HomeDocument | NavDocument;

/**
 * Primary content in *About → Default → Primary*
 */
export interface AboutSliceDefaultPrimary {
  /**
   * header field in *About → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.default.primary.header
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  header: prismic.KeyTextField;

  /**
   * writeup field in *About → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.default.primary.writeup
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  writeup: prismic.KeyTextField;
}

/**
 * Default variation for About Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<AboutSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *About*
 */
type AboutSliceVariation = AboutSliceDefault;

/**
 * About Shared Slice
 *
 * - **API ID**: `about`
 * - **Description**: About
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSlice = prismic.SharedSlice<"about", AboutSliceVariation>;

/**
 * Primary content in *AccessoriesDisplaySection → Default → Primary*
 */
export interface AccessoriesDisplaySectionSliceDefaultPrimary {
  /**
   * Question field in *AccessoriesDisplaySection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accessories_display_section.default.primary.question
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  question: prismic.KeyTextField;

  /**
   * Writeup field in *AccessoriesDisplaySection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accessories_display_section.default.primary.writeup
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  writeup: prismic.KeyTextField;
}

/**
 * Default variation for AccessoriesDisplaySection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AccessoriesDisplaySectionSliceDefault =
  prismic.SharedSliceVariation<
    "default",
    Simplify<AccessoriesDisplaySectionSliceDefaultPrimary>,
    never
  >;

/**
 * Slice variation for *AccessoriesDisplaySection*
 */
type AccessoriesDisplaySectionSliceVariation =
  AccessoriesDisplaySectionSliceDefault;

/**
 * AccessoriesDisplaySection Shared Slice
 *
 * - **API ID**: `accessories_display_section`
 * - **Description**: AccessoriesDisplaySection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AccessoriesDisplaySectionSlice = prismic.SharedSlice<
  "accessories_display_section",
  AccessoriesDisplaySectionSliceVariation
>;

/**
 * Primary content in *CustomerSatisfactionSection → Default → Primary*
 */
export interface CustomerSatisfactionSectionSliceDefaultPrimary {
  /**
   * Header field in *CustomerSatisfactionSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: customer_satisfaction_section.default.primary.header
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  header: prismic.KeyTextField;

  /**
   * Writeup field in *CustomerSatisfactionSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: customer_satisfaction_section.default.primary.writeup
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  writeup: prismic.KeyTextField;
}

/**
 * Default variation for CustomerSatisfactionSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CustomerSatisfactionSectionSliceDefault =
  prismic.SharedSliceVariation<
    "default",
    Simplify<CustomerSatisfactionSectionSliceDefaultPrimary>,
    never
  >;

/**
 * Slice variation for *CustomerSatisfactionSection*
 */
type CustomerSatisfactionSectionSliceVariation =
  CustomerSatisfactionSectionSliceDefault;

/**
 * CustomerSatisfactionSection Shared Slice
 *
 * - **API ID**: `customer_satisfaction_section`
 * - **Description**: CustomerSatisfactionSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CustomerSatisfactionSectionSlice = prismic.SharedSlice<
  "customer_satisfaction_section",
  CustomerSatisfactionSectionSliceVariation
>;

/**
 * Primary content in *EnquiresSection → Default → Primary*
 */
export interface EnquiresSectionSliceDefaultPrimary {
  /**
   * PhoneNumber field in *EnquiresSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: enquires_section.default.primary.phonenumber
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  phonenumber: prismic.KeyTextField;
}

/**
 * Default variation for EnquiresSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EnquiresSectionSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<EnquiresSectionSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *EnquiresSection*
 */
type EnquiresSectionSliceVariation = EnquiresSectionSliceDefault;

/**
 * EnquiresSection Shared Slice
 *
 * - **API ID**: `enquires_section`
 * - **Description**: EnquiresSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EnquiresSectionSlice = prismic.SharedSlice<
  "enquires_section",
  EnquiresSectionSliceVariation
>;

/**
 * Primary content in *HeroSection → Default → Primary*
 */
export interface HeroSectionSliceDefaultPrimary {
  /**
   * HeroWriteUp field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.default.primary.herowriteup
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  herowriteup: prismic.KeyTextField;
}

/**
 * Default variation for HeroSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSectionSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSectionSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *HeroSection*
 */
type HeroSectionSliceVariation = HeroSectionSliceDefault;

/**
 * HeroSection Shared Slice
 *
 * - **API ID**: `hero_section`
 * - **Description**: HeroSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSectionSlice = prismic.SharedSlice<
  "hero_section",
  HeroSectionSliceVariation
>;

/**
 * Item in *ProductsOfTheWeek → Default → Primary → Products*
 */
export interface ProductsOfTheWeekSliceDefaultPrimaryProductsItem {
  /**
   * ProductBrandName field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].productbrandname
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  productbrandname: prismic.KeyTextField;

  /**
   * ProductTitle field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].producttitle
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  producttitle: prismic.KeyTextField;

  /**
   * ShortDescription field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].shortdescription
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  shortdescription: prismic.KeyTextField;

  /**
   * FullDescription field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].fulldescription
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  fulldescription: prismic.KeyTextField;

  /**
   * ProductPrize field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Number
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].productprize
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  productprize: prismic.NumberField;

  /**
   * MainProductImage field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].mainproductimage
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  mainproductimage: prismic.ImageField<never>;

  /**
   * ComplimentoryProductImage1 field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].complimentoryproductimage1
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  complimentoryproductimage1: prismic.ImageField<never>;

  /**
   * ComplimentoryProductImage2 field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].complimentoryproductimage2
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  complimentoryproductimage2: prismic.ImageField<never>;

  /**
   * ComplimentoryProductImage3 field in *ProductsOfTheWeek → Default → Primary → Products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[].complimentoryproductimage3
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  complimentoryproductimage3: prismic.ImageField<never>;
}

/**
 * Primary content in *ProductsOfTheWeek → Default → Primary*
 */
export interface ProductsOfTheWeekSliceDefaultPrimary {
  /**
   * HeaderTitle field in *ProductsOfTheWeek → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.headertitle
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  headertitle: prismic.KeyTextField;

  /**
   * Products field in *ProductsOfTheWeek → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: products_of_the_week.default.primary.products[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  products: prismic.GroupField<
    Simplify<ProductsOfTheWeekSliceDefaultPrimaryProductsItem>
  >;
}

/**
 * Default variation for ProductsOfTheWeek Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductsOfTheWeekSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ProductsOfTheWeekSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ProductsOfTheWeek*
 */
type ProductsOfTheWeekSliceVariation = ProductsOfTheWeekSliceDefault;

/**
 * ProductsOfTheWeek Shared Slice
 *
 * - **API ID**: `products_of_the_week`
 * - **Description**: ProductsOfTheWeek
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductsOfTheWeekSlice = prismic.SharedSlice<
  "products_of_the_week",
  ProductsOfTheWeekSliceVariation
>;

/**
 * Item in *SafetyTipsSection → Default → Primary → SafetyTip*
 */
export interface SafetyTipsSectionSliceDefaultPrimarySafetytipItem {
  /**
   * Tip field in *SafetyTipsSection → Default → Primary → SafetyTip*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: safety_tips_section.default.primary.safetytip[].tip
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  tip: prismic.KeyTextField;
}

/**
 * Primary content in *SafetyTipsSection → Default → Primary*
 */
export interface SafetyTipsSectionSliceDefaultPrimary {
  /**
   * SafetyTip field in *SafetyTipsSection → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: safety_tips_section.default.primary.safetytip[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  safetytip: prismic.GroupField<
    Simplify<SafetyTipsSectionSliceDefaultPrimarySafetytipItem>
  >;
}

/**
 * Default variation for SafetyTipsSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SafetyTipsSectionSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<SafetyTipsSectionSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *SafetyTipsSection*
 */
type SafetyTipsSectionSliceVariation = SafetyTipsSectionSliceDefault;

/**
 * SafetyTipsSection Shared Slice
 *
 * - **API ID**: `safety_tips_section`
 * - **Description**: SafetyTipsSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SafetyTipsSectionSlice = prismic.SharedSlice<
  "safety_tips_section",
  SafetyTipsSectionSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      ExtrapagesDocument,
      ExtrapagesDocumentData,
      ExtrapagesDocumentDataSlicesSlice,
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataSlicesSlice,
      NavDocument,
      NavDocumentData,
      NavDocumentDataNavigationsItem,
      NavDocumentDataProductsItem,
      NavDocumentDataSlicesSlice,
      AllDocumentTypes,
      AboutSlice,
      AboutSliceDefaultPrimary,
      AboutSliceVariation,
      AboutSliceDefault,
      AccessoriesDisplaySectionSlice,
      AccessoriesDisplaySectionSliceDefaultPrimary,
      AccessoriesDisplaySectionSliceVariation,
      AccessoriesDisplaySectionSliceDefault,
      CustomerSatisfactionSectionSlice,
      CustomerSatisfactionSectionSliceDefaultPrimary,
      CustomerSatisfactionSectionSliceVariation,
      CustomerSatisfactionSectionSliceDefault,
      EnquiresSectionSlice,
      EnquiresSectionSliceDefaultPrimary,
      EnquiresSectionSliceVariation,
      EnquiresSectionSliceDefault,
      HeroSectionSlice,
      HeroSectionSliceDefaultPrimary,
      HeroSectionSliceVariation,
      HeroSectionSliceDefault,
      ProductsOfTheWeekSlice,
      ProductsOfTheWeekSliceDefaultPrimaryProductsItem,
      ProductsOfTheWeekSliceDefaultPrimary,
      ProductsOfTheWeekSliceVariation,
      ProductsOfTheWeekSliceDefault,
      SafetyTipsSectionSlice,
      SafetyTipsSectionSliceDefaultPrimarySafetytipItem,
      SafetyTipsSectionSliceDefaultPrimary,
      SafetyTipsSectionSliceVariation,
      SafetyTipsSectionSliceDefault,
    };
  }
}
