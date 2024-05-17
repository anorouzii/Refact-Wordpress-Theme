<?php
// Check if ACF plugin is active
if (function_exists('get_field')) {
	?>
	<section id="menu" class="menu">
		<div class="section-container menu__container">
			<div class="menu__head">
				<h4 class="section-title menu__title">Our Menu</h4>
				<ul class="menu__tabs">
					<li class="menu__tab active" data-tab="starter">Starter</li>
					<li class="menu__tab" data-tab="main_dishes">Main Dishes</li>
					<li class="menu__tab" data-tab="desserts">Desserts</li>
				</ul>
			</div>

			<?php
			$categories = array('starter', 'main_dishes', 'desserts');
			foreach ($categories as $category) :
				?>
				<div id="<?php echo $category; ?>"
					 class="menu__content <?php echo $category === 'starter' ? 'active' : ''; ?>">
					<div class="menu__list">
						<?php
						$args = array(
							'post_type' => 'menu_item',
							'posts_per_page' => -1,
							'meta_query' => array(
								array(
									'key' => 'category',
									'value' => $category,
									'compare' => 'LIKE'
								)
							)
						);
						$menu_query = new WP_Query($args);

						if ($menu_query->have_posts()) :
							while ($menu_query->have_posts()) : $menu_query->the_post();
								$name = get_field('name');
								$recipe = get_field('recipe');
								$price = get_field('price');
								?>
								<div class="menu__item">
									<div class="menu__item-details">
										<h5 class="menu__item-title"><?php echo esc_html($name); ?></h5>
										<p class="menu__item-recipe"><?php echo esc_html($recipe); ?></p>
									</div>
									<span class="menu__item-price">$<?php echo esc_html($price); ?></span>
								</div>
							<?php
							endwhile;
						else :
							echo '<p>No menu items available for this category.</p>';
						endif;
						wp_reset_postdata();
						?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</section>
	<?php
} else {
	echo '<p style="margin: 2rem">Please install and activate the Advanced Custom Fields plugin to show the menu</p>';
}
?>
