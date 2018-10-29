<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo bloginfo('name'); ?></title>
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/style.css">
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/main.js"></script>
  </head>
  <body>
    <header>
        <div class="container">
            <!-- <div class="flex"> -->
                <h1>free translation >< свободный перевод >< vapaa käännös</h1>
                <nav>
                    <a href="#" id="about-link" class="nav__link show">About</a>
                </nav>
            <!-- </div> -->
            <div id="about" class="about about--hidden">
                <div class="language-toggle">
                    <a id="langLink-en" class="lang-link" href="#">en</a> •  
                    <a id="langLink-fi" class="lang-link" href="#">fi</a> • 
                    <a id="langLink-ru" class="lang-link" href="#">ru</a>
                </div>
                <div id="about-en" class="about-lang about-en">
                    <p>Free translation is a multi-disciplinary exhibition showcasing international works as part of Prison Outside #2.  This is the online version of the exhibition, which is shown at MAA-tila in Helsinki from November 15-29, 2018.</p>

                    <p>This collection of artworks is generated from an open call to incarcerated people, ex-convicts, and anyone affected by imprisonment. This call is open to all ages. This exhibition will make use of the translation process as we will interact and create new artworks in the gallery space. Your works on view will encourage the audience to prompt dialogue, inspire thoughts, and creatively activate the space. Your voice is heard and recognized. If you would like to contribute artwork, you may send it info@prisonspace.org.</p>

                    <p>Next to each picture you are welcome to add your translation of that piece.  It can be in text, visual, or video format.  Your translations and interpretations only inspires more thoughts, feelings, and perspectives to be shared, to be sparked, and to be challenged.</p>

                    <p>Prison Outside is centred on the subjects of imprisonment, justice, and the role of the arts in the relationships between people in prisons and people outside. We are interested in perceptions of incarcerated people and ex-convicts in the society, and how we can break the stereotypes and support each other. We focus on artistic practices, be it prisoners’ own initiatives or designed educational projects that promote self-expression, solidarity and communication between people of all walks of life. We also offer a platform for production of artistic projects related to imprisonment, currently with a focus on Finland and Russia.</p>

                    <p>We have been continuously supported by Kone Foundation.</p>
                </div>
                <div id="about-fi" class="about-lang about-fi hidden">
                    <p>tk</p>
                </div>

                <div id="about-ru" class="about-lang about-ru hidden">
                    <p>tk</p>
                </div>
            </div>
        </div>
    </header>
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
        <?php rewind_posts(); ?>
        <?php if ( have_posts() ) : while( have_posts() ) : the_post(); ?>
        <div id="details-artworks">
            <div class="details__artwork js-artwork-detail">
                <?php the_post_thumbnail('large'); ?>
                <div class="details__artwork-info">
                    <?php $id = get_the_ID(); ?>
                    <?php echo get_post_meta($id, 'artist', true); ?> - 
                    <em><?php echo get_post_meta($id, 'title', true); ?></em>, 
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
    </section>
    <footer>
        <div class="container">
            &copy; 2018 - Prison Outside
        </div>
    </footer>
  </body>
</html>