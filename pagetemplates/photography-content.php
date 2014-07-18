<div class="photography container">
	<?php //$posts = fetch_page_posts(7)->posts?>
	<?php if(isset($posts)):?>
		<?php foreach($posts as $post): ?>
			<?php if(has_post_thumbnail( $post->ID )):?>
				<?php $large =wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large');?>
				<?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), array(140, 140));?>
				<?php $categories = array_reverse( get_the_category( $post->ID ) );?>
				<?php $categoryPath = ""; foreach($categories as $category): ?>
					<?php $categoryPath .= "/".$category->slug; ?>
				<?php endforeach; ?>
				<img class="square-item-array" data-category="<?php echo $categoryPath; ?>" data-url="<?php echo $large[0]; ?>" src="<?php echo $thumbnail[0]; ?>" />
			<?php endif; ?>
		<?php endforeach; ?>
	<?php endif;?>
</div>

