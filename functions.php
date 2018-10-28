<?php

add_theme_support('post-thumbnails');

/**
* Removes width and height attributes from image tags
*
* @param string $html
*
* @return string
*/
function remove_image_size_attributes( $html ) {
return preg_replace( '/(width|height)="\d*"/', '', $html );
}

add_filter( 'post_thumbnail_html', 'remove_image_size_attributes' );
add_filter( 'image_send_to_editor', 'remove_image_size_attributes' );