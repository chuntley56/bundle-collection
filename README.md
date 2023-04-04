# bundle-collection

A storefront app built with Next.js. This app displays a collection of bundles, and has the ability to sort by tag when a tag is clicked.

![Screen Shot 2023-03-24 at 4 35 33 PM](https://user-images.githubusercontent.com/13876480/227661722-af82896f-084a-4e02-b287-78028f191c8d.png)

# Project Requirements

What to build
Using a Javascript library of your choice, build a collection page that displays bundles filtered based on selected scent option(s). Use the following API endpoints to retrieve the data:

Base URL: https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/
Endpoints: GET /bundles, GET /product/{handle}


Requirements
Display the following information for a bundle: image, title, price, original price (if applicable), scent profile, and included products.
The scent filter should be at the top of the page, with available scent options listed. It may be a group of checkboxes, a drop down, or any other UI format you want. The filter must be functional; the options selected updates the bundles displayed.
See the design example below. You may use it as is or modify it. Feel free to come up with your own design if you want. 
(Optional) Make the page responsive.
(Optional) Use the scent specific colors: woodsy: #165834, citrus: #de7c00, fresh: #006fd6, herbal: #5a3714, rich: #e0a17e, spiced: #c10000
