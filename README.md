# Diagnal-Play
This is a youtube like app built using react to display a list of images/previews for streamable media. It uses redux to manage state throughout the app.

##### Visit: [https://krishnasharmacc.github.io/diagnal-play/]

### |

#### Features:
- ``Fully Responsive! - Works on all media devices including desktop tablet and mobile.``

- ``Features lazy loading! -  To reduce initial load time.``
 
- ``Implements client side search using redux ``

-   ``Using memoization and other optimization techniques wherever possible to prevent useless re-render cycles`` 

- ``Nice and slick animations for the search bar and images (during load)``  

### |


#### Current Limitations:
- On first load, if the search results rendered in the view having height less than the scrollable parent(grid) height, matching results from the next pages won't because request for next page won't get triggered.
^ The above problem can be mitigated if we have a live search API which would return a list of results based on the search term. (Which is simply being imitated locally now.)

### |
### Enhancements (TBD):

- Serve static assets via CDN for better load times..
- Use Virtual Loading to render only the items visible in the viewport.
- For better responsiveness, we can specify breakpoints for devices like mobile, tablets, desktops etc.
- Use cloudinary or similar technologies to optimize thumbnails on the go based on device width/height.

### |

#### To start the Project

###### `yarn start`

[https://krishnasharmacc.github.io/diagnal-play/]: https://krishnasharmacc.github.io/diagnal-play/
