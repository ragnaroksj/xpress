<div class="video container">
	<?php $posts = fetch_page_posts(8,1)->posts ?>
	<?php if(isset($posts)):?>
		<?php foreach($posts as $post): ?>
			<?php echo htmlspecialchars_decode( $post->post_content ); ?>
		<?php endforeach; ?>
	<?php endif;?>
</div>

