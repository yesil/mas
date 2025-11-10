# MCS Placeholder Picker Integration

## Overview

A small button in the card creation form opens a dialog displaying available MCS placeholder keys and their resolved values for the selected offer. Users can click any key to paste it into the active form field.

## Preview & Delivery

M@S uses an Adobe I/O Runtime action to resolve MCS placeholder keys. Results are cached properly along with M@S placeholders. Placeholder resolution is based on the offer selected during card creation, ensuring that previews and delivery show the correct content for each offer context.

## Reference

See [sample.json](./sample.json) for an example MCS response structure.

## Supported Placeholders

### Copy Placeholders

The following copy-related placeholders are supported:

- `{{mcs.copy.name}}` - Product name
- `{{mcs.copy.short_name}}` - Short product name
- `{{mcs.copy.internal_name}}` - Internal product name
- `{{mcs.copy.description}}` - Full product description
- `{{mcs.copy.short_description}}` - Short product description

### Asset Placeholders

#### Icons

- `{{mcs.assets.icons.48}}` - 48x48 icon
- `{{mcs.assets.icons.svg}}` - SVG icon

#### Background Images

- `{{mcs.assets.background_images.1}}` or `{{mcs.assets.background_images.m}}` - Standard resolution background image
- `{{mcs.assets.background_images.2}}` or `{{mcs.assets.background_images.l}}` - High resolution background image

### Link Placeholders

#### Getting Started Links

- `{{mcs.links.getting_started.text}}` - Getting started link text
- `{{mcs.links.getting_started.href}}` - Getting started link URL

#### Getting Started Template Links

- `{{mcs.links.getting_started_template.text}}` - Getting started template link text
- `{{mcs.links.getting_started_template.href}}` - Getting started template link URL

### Fulfillable Items Placeholders

Fulfillable items are accessed from the default administrable_item using the item's `code` as the key. Each fulfillable item supports the same placeholder structure as the main product.

#### List Access

Access the entire list of fulfillable items without specifying an item code:

- `{{mcs.fulfillable_items}}` - Returns the complete list/object of all fulfillable items

This can be used for iteration or to get metadata about all fulfillable items (e.g., count, codes, etc.).

#### Individual Item Access

Access specific fulfillable items using their `code`:

#### Copy

- `{{mcs.fulfillable_items.<item_code>.copy.name}}` - Fulfillable item name
- `{{mcs.fulfillable_items.<item_code>.copy.enterprise_name}}` - Enterprise name
- `{{mcs.fulfillable_items.<item_code>.copy.description}}` - Full description
- `{{mcs.fulfillable_items.<item_code>.copy.short_description}}` - Short description

#### Assets

- `{{mcs.fulfillable_items.<item_code>.assets.icons.48}}` - 48x48 icon
- `{{mcs.fulfillable_items.<item_code>.assets.icons.svg}}` - SVG icon
- `{{mcs.fulfillable_items.<item_code>.assets.icons.128}}` - 128x128 icon

#### Examples

- `{{mcs.fulfillable_items.spark_video.copy.name}}` - "Spark Video"
- `{{mcs.fulfillable_items.cc_storage.copy.name}}` - "Actifs Creative Cloud"
- `{{mcs.fulfillable_items.firefly_credits.assets.icons.svg}}` - Firefly icon SVG

## Technical Considerations

### Known Concerns

1. **Scalability**

    - MCS preview doesn't scale even for authoring previews
    - Error: too many requests

2. **Asset Optimization**
    - Assets not optimized for web use
    - Example: `https://mcs.odin.adobe.com/content/dam/mcs/en/icons/raw/svg/adobeexpress.svg` (178kb)
