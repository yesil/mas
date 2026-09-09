# checkout-link {#checkout-link}

## Introduction {#introduction}

This custom element renders a checkout link supporting most of the features documented at https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=businessservices&title=UCv3+Link+Creation+Guide.<br>
Sometimes a checkout-link can be also referred as placeholder, as it can be used as an inline link resolving at runtime.<br>
The term placeholder will be deprecated and it is recommended to refer as **checkout-link custom element** going forward.

Behind the scene, it uses https://git.corp.adobe.com/PandoraUI/commerce-core to generate the checkout url.

It requires an Offer Selector ID to retrieve the offer details from WCS.

See [MAS](mas.html#terminology) to learn more.

### Example

```html {.demo}
<a
    href="#"
    is="checkout-link"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    >Buy now</a
>
```

## AUP Select {#aup-select}

To route checkout links and buttons through the host's initialized `window.aupsdk`, add:

```html
<meta name="aup-select" content="on" />
```

Checkout reads the live boolean `service.settings.aupSelect` on each click. The settings layer resolves `aup-select` metadata through `getParameter`, falling back to the commerce service's `aup-select` attribute when metadata is absent:

```html
<mas-commerce-service aup-select="on"></mas-commerce-service>
```

Only exact `on` enables routing; the default is disabled. The `aup-select` query parameter takes precedence over metadata, which takes precedence over the service attribute, including an explicit `off` or empty value. Query and metadata changes take effect on subsequent clicks without reinitializing the service. Removing the query parameter restores metadata or the service attribute; removing metadata restores the service attribute. Storage overrides are ignored.

Single-offer `BASE` and `TRIAL` CTAs launch the `buy` and `try` intents through `launchWorkflowInModal`, using the SDK's default rendering mode. M@S does not initialize or reconfigure the SDK. The configured checkout client ID is forwarded to orchestration without a client-side allowlist.

The resolved offer supplies product arrangement, optional product code, and segments. Checkout options supply country, language, and segment overrides. Optional `svar`, `customerIntent`, and `sid` go in the recommendation context; `ctxrturl`, `rtc`, `lo`, and `af` go in workflow params. The return URL defaults to the current page. Internal Select variants are not forwarded.

Downloads, upgrades, perpetual offers, promotions, multiple offers/add-ons, non-unit quantities, and modified link clicks retain the existing action. If the SDK is unavailable or launch fails, M@S invokes the saved checkout action once. Workflow completion or cancellation does not trigger fallback. Repeated checkout clicks are suppressed until the SDK reports workflow exit.

The original link URL and click event remain available to the host's analytics. This also applies to headless CTAs after their `mas-field` wrapper is removed.

On cancellation, M@S uses the SDK's `System/AppClosed` cart report to synchronize the originating card's addon and quantity. Only products matching that card's main offer and authored addon are applied. Product identity comes from resolved offer data, so hash-based host actions and checkout URLs without `pa` can synchronize. If addon offer data is unavailable, the card retains its current state. Cart synchronization errors do not trigger checkout fallback. Host and SDK default message handlers remain in the delegation chain. Addon presentation in Select (`showaddon`: `off`, `checkbox`, or `toggle`) remains controlled by the experience campaign; it does not preselect the card's addon.

## Attributes {#attributes}

| Attribute                     | Description                                                                                                                                                                                                                                  | Default Value | Required | Provider                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- | ----------------------- |
| `data-wcs-osi`                | Offer Selector ID, can be multiple, separeted by comma                                                                                                                                                                                       |               | `true`   | mas.js or consumer code |
| `data-checkout-workflow`      | Target checkout workflow for the generation of checkout urls                                                                                                                                                                                 | UCv3          | `false`  | mas.js                  |
| `data-checkout-workflow-step` | [workflow step](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=businessservices&title=UCv3+Link+Creation+Guide#UCv3LinkCreationGuide-RegularWorkflow) to land on the unified checkout page                                       | email         | `false`  | mas.js                  |
| `data-extra-options`          | additional query params to append to the url, see: [Table of public query params](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=businessservices&title=UCv3+Link+Creation+Guide#UCv3LinkCreationGuide-Tableofpublicqueryparams) | {}            | `false`  | mas.js                  |
| `data-ims-country`            | the ims country to code of the user if signed in, overrides the locale country in the generated checkout url                                                                                                                                 |               | `false`  | mas.js or consumer code |
| `data-perpetual`              | whether this is a perpetual offer `true\|false`                                                                                                                                                                                              |               | `false`  | mas.js                  |
| `data-promotion-code`         | Flex promotion code, if applicable                                                                                                                                                                                                           |               | `false`  | mas.js                  |
| `data-quantity`               | Quantity of the offer to purchase                                                                                                                                                                                                            | 1             | `false`  | mas.js or consumer code |
| `data-entitlement`            | `entitlement` flag for client side interpretation                                                                                                                                                                                            | `false`       | `false`  | mas.js                  |
| `data-upgrade`                | `upgrade` flag for client side interpretation                                                                                                                                                                                                | `false`       | `false`  | mas.js                  |
| `data-modal`                  | `modal` flag for client side interpretation                                                                                                                                                                                                  | `false`       | `false`  | mas.js                  |
| `data-analytics-id`           | human-readable, non-translatable link id for analytics. Authored in Studio in Link Editor.                                                                                                                                                   | `false`       | `false`  | mas.js                  |
| `daa-ll`                      | martech-compatible link id for analytics. Format: '${data-analytics-id}-${#}', where # is the position of the link within a card. E.g. : see-terms-1, buy-now-2                                                                              | `false`       | `false`  | mas.js                  |

### Examples {#examples}

#### Custom Workflow Step

```html {.demo}
<a
    href="#"
    is="checkout-link"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-checkout-workflow-step="recommendation"
    >Buy now</a
>
```

#### Multiple Quantities

Two photoshop and three acrobat pro single apps (TEAMS):

```html {.demo}
<a
    href="#"
    is="checkout-link"
    data-wcs-osi="yHKQJK2VOMSY5bINgg7oa2ov9RnmnU1oJe4NOg4QTYI,vV01ci-KLH6hYdRfUKMBFx009hdpxZcIRG1-BY_PutE"
    data-quantity="2,3"
    >Buy now</a
>
```

#### Custom query params

```html {.demo}
<a
    href="#"
    is="checkout-link"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-extra-options='{"promoid":"promo12345","mv":1,"mv2":2}'
    >Buy now</a
>
```

#### IMS Country

```html {.demo}
<a
    href="#"
    is="checkout-link"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-ims-country="JP"
    >Buy now</a
>
```

## Properties {#properties}

| Property         | Description                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isCheckoutLink` | on checkout link elements, it will return `true`                                                                                                                |
| `onceSettled`    | promise that resolves when the custom-element either resolves or fails to resolve the offer                                                                     |
| `options`        | JSON object with the complete set of properties used to resolve the offer                                                                                       |
| `value`          | The actual offer that is used to render the checkout link. In some cases WCS can return multiple offers but only one will be picked to render for a single app. |

### Example

```html {.demo}
<a
    id="co1"
    href="#"
    is="checkout-link"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-ims-country="CA"
    >Buy now</a
>
<script type="module">
    onceEvent(document.getElementById('co1'), 'mas:resolved', ({ target }) => {
        document.getElementById('coValue').innerHTML = JSON.stringify(
            target.value,
            null,
            '\t',
        );
        document.getElementById('coOptions').innerHTML = JSON.stringify(
            target.options,
            null,
            '\t',
        );
    });
</script>
```

#### value property

```json {#coValue}

```

#### options property

```json {#coOptions}

```

## Methods {#methods}

| Property                       | Description                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `requestUpdate(true \| false)` | Causes a re-render using the actual options, force = false by default, meaning if no change is found will skip |

## Events {#events}

| Event          | Description                                        |
| -------------- | -------------------------------------------------- |
| `mas:pending`  | fires when checkout link starts loading            |
| `mas:resolved` | fires when the offer is successfully resolved      |
| `mas:failed`   | fires when the offer could not be found or fetched |

<br>

For each event, the following css classes are toggled on the element: `placeholder-pending`, `placeholder-resolved`, `placeholder-failed`.

### Example

```html {.demo}
<div id="eventsDemo">
    <a
        is="checkout-link"
        data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
        >Buy now (click me)</a
    >
    <br />
    <a
        is="checkout-link"
        data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
        ><span style="pointer-events: none;"
            >Span + <strong>Strong + Buy now</strong></span
        ></a
    >
</div>
<button id="btnRefresh">Refresh</button>
<script type="module">
    const log = document.getElementById('log');
    const logger = (...messages) =>
        (log.innerHTML = `${messages.join(' ')}<br>${log.innerHTML}`);
    const eventsDemo = document.getElementById('eventsDemo');
    eventsDemo.addEventListener('mas:pending', () =>
        logger('checkout-link pending'),
    );
    eventsDemo.addEventListener('mas:resolved', (e) =>
        logger('checkout-link resolved'),
    );
    eventsDemo.addEventListener('mas:failed', () =>
        logger('checkout-link failed'),
    );
    eventsDemo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.isCheckoutLink) {
            logger('checkout link is clicked: ', e.target.href);
        } else {
            logger('element clicked: ', e.target);
        }
    });
    document.getElementById('btnRefresh').addEventListener('click', () => {
        [...eventsDemo.querySelectorAll('a')].forEach((a) =>
            a.requestUpdate(true),
        );
    });
</script>
```

#### Logs

```html {#log}

```
