<?php
// Check if ACF plugin is active
if (function_exists('get_field')) { ?>
	<section id="popular-dishes" class="popular-dishes">
		<div class="section-container popular-dishes__container">
			<div class="popular-dishes__head">
				<h4 class="section-title popular-dishes__title">The Most Popular Dishes</h4>
				<div class="popular-dishes__navigation">
					<button disabled class="popular-dishes__navigation-prev" aria-label="Previous slide">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/images/icon/arrow-left.svg"
							 alt="Prev">
					</button>
					<div class="popular-dishes__navigation-counter"></div>
					<button class="popular-dishes__navigation-next" aria-label="Next slide">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/images/icon/arrow-right.svg"
							 alt="Next">
					</button>
				</div>
			</div>
			<div class="popular-dishes__carousel">
				<?php
				$args = array(
					'post_type' => 'popular_dish',
					'posts_per_page' => -1,
				);
				$popular_query = new WP_Query($args);

				if ($popular_query->have_posts()) :
					while ($popular_query->have_posts()) : $popular_query->the_post();
						$image = get_field('image');
						$price = get_field('price');
						$description = get_field('description');
						?>
						<div class="popular-dishes__item">
							<figure class="popular-dishes__item-media">
								<img src="<?php echo esc_url($image); ?>" alt="<?php the_title(); ?>"
									 class="popular-dishes__item-image">
							</figure>
							<div class="popular-dishes__item-details">
								<h5 class="popular-dishes__item-title"><?php the_title(); ?></h5>
								<p class="popular-dishes__item-description"><?php echo esc_html($description); ?></p>
								<span class="popular-dishes__item-price">$<?php echo esc_html($price); ?></span>
							</div>
						</div>
					<?php
					endwhile;
				else :
					echo '<p>No popular dishes available</p>';
				endif;
				wp_reset_postdata();
				?>

			</div>
		</div>
	</section>

	<?php
} else {
	echo '<p style="margin: 2rem">Please install and activate the Advanced Custom Fields plugin to show popular dishes</p>';
}
?>
