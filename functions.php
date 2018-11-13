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

function po_make_lazy_load($html, $post_id, $post_thumbnail_id, $size) {
    if( $size == 'large' ){
        $html = preg_replace('/src="(.*)"/', 'data-src="$1"', $html);
        $html = preg_replace('/srcset="(.*)"/', 'data-srcset="$1"', $html);
    }
    return $html;
}

function po_custom_sizes( $sizes, $size, $image_src, $image_meta, $attachment_id ){
    if ($size == 'medium') { 
        $sizes = '(min-width: 800px) 200px, 90vw'; 
    }
    else if ($size == 'large') { 
        $sizes = '(max-width: 800px) 90vw'; 
    }
    return $sizes;
}

add_filter( 'post_thumbnail_html', 'po_make_lazy_load', 10, 4 );
add_filter( 'wp_calculate_image_sizes', 'po_custom_sizes', 10, 5);
add_filter( 'image_send_to_editor', 'remove_image_size_attributes' );
