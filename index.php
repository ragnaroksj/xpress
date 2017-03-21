<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
 get_header(); ?>

<div class="headline"><?php include "homepage/headline.php" ?></div>
<div class="story">
	<!--div class="story-nav">
		<ul class="standard-page-layout">
			<li class="all-story story-nav-item active-tab" data-filter="14">All Stories</li>
		<?php $categories = get_subcategories(14); ?>
		<?php foreach( $categories as $category ): ?>
			<li data-filter="<?php echo $category->cat_ID; ?>" class="story-nav-item <?php echo $category->slug." cat-id-".$category->cat_ID." cat-parent-id-".$category->category_parent ?>"><?php echo $category->name ?></li>
		<?php endforeach; ?>
		</ul>
	</div-->
	<div class="story-content">
		<?php $posts = get_posts( "category=14" );?>
		<?php foreach( $posts as $post): ?>
		<div class="full-page-layout story-listitem-container" data-filter-num="<?php echo get_post_category_asclass( $post->ID ) ?>"  >
			<div class="clearfix story-listitem post-<?php echo $post->ID ?> standard-page-layout">
				<div class="story-item-img"><?php echo get_the_post_thumbnail( $post->ID, array(300,300) ); ?></div>
				<div class="story-item-detial">
					<h3 class="story-item-title"><?php echo $post->post_title; ?></h3>
					<div class="story-itme-excerpt"><?php echo $post->post_excerpt; ?></div>
					<div class="pure-button story-more" data-source="<?php echo $post->ID ?>" data-bgmusic="<?php echo $post->music_id; ?>"><a href="<?php echo get_permalink()?>">Read More</a></div>
				</div>
			</div>
			<!--div class="full-page-layout story-telling">
				<div class="clearfix story-telling-content standard-page-layout">
					
				</div>
			</div-->
		</div>

		<?php endforeach; ?>

	</div>
</div>
<!--div class="homeblocks">
	<ul class="phin-tab"></ul>
	<div class="phin-content"></div>
</div-->
<div class="full-page-layout story-telling"></div>

<?php get_footer(); ?>
