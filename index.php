<?php get_header(); ?>
    <div class="container">
        <section id="overview" class="overview">
            <!-- thumbnail images of works in the exhibition containing links that will take you to a detail view of the selected artwork   -->
            <?php if ( have_posts() ) : while( have_posts() ) : the_post(); ?>
            <div class="overview__artwork-container">
                <a class="js-artwork-link overview__artwork-link" href="#"><?php the_post_thumbnail('medium'); ?></a>
            </div>
            <?php endwhile; else : ?>
            <?php endif; ?>
        </section>
    </div>
    <section id="details" class="details">
        <a id="details-close-btn" class="details__close-btn" href="#">close</a>
        <a id="details-next-btn" class="details__next-btn" href="#">next</a>
        <a id="details-prev-btn" class="details__prev-btn" href="#">prev</a>
        <!-- individual works with credits, descriptions and comments. back and forward links to next and previous artwork -->
        <div id="details-artworks">
            <?php rewind_posts(); ?>
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
                        <?php wp_list_comments(array(), $comments); ?>
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
    </section>
<?php get_footer(); ?>