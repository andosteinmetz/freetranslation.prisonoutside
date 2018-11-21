<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo bloginfo('name'); ?></title>
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/classlist/1.2.20171210/classList.min.js"></script>
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/masonry.pkgd.min.js"></script>
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/main.js"></script>
  </head>
  <body>
    <header>
        <div class="container">
            <!-- <div class="flex"> -->
                <h1>free translation >< свободный перевод >< vapaa käännös</h1>
                <nav>
                    <a href="#" id="about-link" class="nav__link show">About</a>
                    <a href="#" id="contact-link" class="nav__link show">Contact</a>
                </nav>
            <!-- </div> -->
            <div id="about" class="about about--hidden">
                <div class="language-toggle">
                    <a id="langLink-en" data-lang="en" class="lang-link current" href="#">en</a> •  
                    <a id="langLink-fi" data-lang="fi" class="lang-link" href="#">fi</a> • 
                    <a id="langLink-ru" data-lang="ru" class="lang-link" href="#">ru</a>
                </div>
                <?php get_template_part('about_en'); ?>
                <?php get_template_part('about_fi'); ?>
                <?php get_template_part('about_ru'); ?>
            </div>
            <div id="contact" class="about about--hidden">
                <div class="language-toggle">
                    <a data-lang="en" class="lang-link current" href="#">en</a> •  
                    <a data-lang="fi" class="lang-link" href="#">fi</a> • 
                    <a data-lang="ru" class="lang-link" href="#">ru</a>
                    <?php get_template_part('contact_en'); ?>
                    <?php get_template_part('contact_fi'); ?>
                    <?php get_template_part('contact_ru'); ?>
                </div>
            </div>
        </div>
        <div id="contact" class="contact contact--hidden">
            
        </div>
    </header>