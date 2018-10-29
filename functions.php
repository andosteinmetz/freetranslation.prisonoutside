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

function make_lazy_load($html) {
    $html = preg_replace('/src="([\d\w]*)"/', 'data-src="$1"', $html);
    return preg_replace('/srcset="(.*)"/', 'data-srcset="$1"', $html);
}

add_filter( 'post_thumbnail_html', 'make_lazy_load' );
add_filter( 'image_send_to_editor', 'remove_image_size_attributes' );
