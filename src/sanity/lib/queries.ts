import { defineQuery } from 'next-sanity';

const IMAGE_FIELDS = `
  alt,
  caption,
  cloudinary,
  asset->{
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  }
`;

export const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  featured,
  readingTime,
  "mainImage": mainImage { ${IMAGE_FIELDS} },
  "author": author->{
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    credentials,
    linkedin,
    github,
    twitter,
    "image": image { ${IMAGE_FIELDS} }
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current,
    description
  },
  "tags": tags[]->{
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export const BLOG_INDEX_QUERY = defineQuery(`
{
  "posts": *[
    _type == "post" &&
    defined(slug.current) &&
    ($preview == true || (status == "published" && publishedAt <= now())) &&
    ($category == "" || $category in categories[]->slug.current) &&
    ($tag == "" || $tag in tags[]->slug.current) &&
    ($query == "" || title match $query || excerpt match $query || pt::text(body) match $query)
  ] | order(featured desc, publishedAt desc) [$start...$end] {
    ${POST_CARD_FIELDS}
  },
  "total": count(*[
    _type == "post" &&
    defined(slug.current) &&
    ($preview == true || (status == "published" && publishedAt <= now())) &&
    ($category == "" || $category in categories[]->slug.current) &&
    ($tag == "" || $tag in tags[]->slug.current) &&
    ($query == "" || title match $query || excerpt match $query || pt::text(body) match $query)
  ]),
  "categories": *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  },
  "tags": *[_type == "tag"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
}`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
*[
  _type == "post" &&
  slug.current == $slug &&
  ($preview == true || (status == "published" && publishedAt <= now()))
][0] {
  ${POST_CARD_FIELDS},
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": reference->slug.current,
        "type": reference->_type
      }
    },
    _type == "optimizedImage" => {
      ${IMAGE_FIELDS}
    }
  },
  seo {
    metaTitle,
    metaDescription,
    canonicalPath,
    noIndex,
    "ogImage": ogImage { ${IMAGE_FIELDS} },
    faqs[] {
      question,
      answer
    }
  }
}`);

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
*[_type == "post" && defined(slug.current) && status == "published" && publishedAt <= now()] {
  "slug": slug.current
}`);

export const RELATED_POSTS_QUERY = defineQuery(`
*[
  _type == "post" &&
  slug.current != $slug &&
  status == "published" &&
  publishedAt <= now() &&
  (
    count((categories[]->slug.current)[@ in $categorySlugs]) > 0 ||
    count((tags[]->slug.current)[@ in $tagSlugs]) > 0
  )
] | order(publishedAt desc) [0...3] {
  ${POST_CARD_FIELDS}
}`);

export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  credentials,
  linkedin,
  github,
  twitter,
  "image": image { ${IMAGE_FIELDS} }
}`);

export const AUTHOR_SLUGS_QUERY = defineQuery(`
*[_type == "author" && defined(slug.current)] {
  "slug": slug.current
}`);

export const POSTS_BY_AUTHOR_QUERY = defineQuery(`
*[
  _type == "post" &&
  author->slug.current == $slug &&
  status == "published" &&
  publishedAt <= now()
] | order(publishedAt desc) [0...12] {
  ${POST_CARD_FIELDS}
}`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description
}`);

export const TAG_BY_SLUG_QUERY = defineQuery(`
*[_type == "tag" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description
}`);

export const RSS_POSTS_QUERY = defineQuery(`
*[
  _type == "post" &&
  defined(slug.current) &&
  status == "published" &&
  publishedAt <= now()
] | order(publishedAt desc) [0...25] {
  ${POST_CARD_FIELDS},
  body
}`);
