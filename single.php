<?php get_header(); ?>
    <div id="details" class="details details--single">
    <?php if ( have_posts() ) : while( have_posts() ) : the_post(); ?>
        <?php $id = get_the_ID(); ?>
        <div class="details__artwork js-artwork-detail">
            <?php if(get_post_meta($id, 'video_embed')) : ?>
                <div class="videoWrapper">
                    <!-- Copy & Pasted from YouTube -->
                    <!-- <iframe width="560" height="349" src="http://www.youtube.com/embed/n_dZNLr2cME?rel=0&hd=1" frameborder="0" allowfullscreen></iframe> -->
                    <?php echo get_post_meta($id, 'video_embed')[0]; ?>
                </div>
            <?php else : ?>
                <?php the_post_thumbnail('large'); ?>
            <?php endif; ?>
            <div class="details__artwork-info">
                <?php echo get_post_meta($id, 'artist', true); ?> - 
                <em><!-- <?php echo get_post_meta($id, 'title', true); ?> --><?php the_title(); ?></em>, 
                <?php echo get_post_meta($id, 'date', true); ?>
            </div>
            <div class="details__comments">
                <?php
                    $args = array('post_id' => $id);
                    $comments = get_comments($args);
                    // print($id);
                    // var_dump($comments);
                ?>
                <?php if (count($comments) > 0) : ?>
                <h4>Interpretations</h4>
                <ul>
                    <!-- <?php foreach($comments as $comment) : if($comment->comment_approved) : ?>
                    <li class="details__comment">
                        <?php echo $comment->comment_content; ?> &mdash; <?php echo $comment->comment_author; ?>
                    </li>
                    <?php endif; endforeach; ?> -->

                    <?php 
                        $comments_options = array('avatar_size' => 0);
                        wp_list_comments($comments_options, $comments); 
                    ?>
                </ul>
                <?php endif; ?>
                <?php comment_form(array(
                        'class_form' => 'comment-form', 
                        'comment_field' => '<textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required"></textarea>',
                        'label_submit' => 'Add',
                        'title_reply' => 'Add your interpretation',
                    ), $id); ?>
            </div>
        </div>
    <?php endwhile; else : ?>
    <?php endif; ?>
    </div>
<?php get_footer(); ?>