<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="styles/index.css">

	<title>Transcriptor v2</title>
</head>

<body class="inter-normal damn">
	<nav class="flex vcenter space-between" style="margin: 10px 1px">
		<div class="flex">
			<!-- icon -->
			<a class="flex vcenter inter-semibold mr-s text-lg" href="#">
				<img class="mr-s" src="assets/scroll.png" alt="Logo" width="30" height="24">
				Transcriptor v2
			</a>

			<!-- items -->
			<div class="flex gap-s vcenter viewport-l" id="nav-items-container" style="display: flex;">
				<a href="#" style="line-height: 1.5rem; font-size: 16;">
					Home
				</a>

				<a href="#" style="line-height: 1.5rem; font-size: 16;">
					Tools
				</a>
			</div>
		</div>

		<!-- Show more items icon-->
		<div class="viewport-s">
			<!-- TODO: add a div containing items, should fill up the screen-->
			<a href="">
				<span>
					<img class="mr-s" src="assets/icons/menu-outline.svg" alt="Logo" width="30"
						height="24">
				</span>
			</a>
		</div>
	</nav>

	<!-- spacer -->
	<div class="@vp-s:h-s"></div>

	<!-- main -->
	<div class="@vp-l:mx-m,my-s">

		<!-- Input and trancript container -->
		<div class="flex @vp-s:col @vp-l:h-m gap-s">

			<!-- Input card-->
			<div class="card p-s" style="flex: 1;">
				<div class="flex" style="align-items: start;">
					<h style="margin-top: 8px;">Input</h>
				</div>

				<div class="flex vcenter gap-s mt-xs">
					<!-- TODO: change icon -->
					<button id="importBtn" class="flex vcenter">
						<img class="mr-xs" src="assets/icons/send-outline.svg" alt="Logo"
							width="15" height="15">
						Import
						<input class="hidden" id="fileInput" name="file" type="file">
					</button>

					<!-- TODO: use session to save file input -->
					<button class="flex vcenter" <?php if (!isset($_FILES['file']['name'])) {
						echo "disabled" ; } ?> id="processBtn">
						<img class="mr-xs logo" width="15" height="15" class="mr-xs"
							src="assets/icons/color-wand-outline.svg" alt="Logo">
						Process
					</button>
					<button id="doneBtn" disabled class="flex vcenter">
						<img class="mr-xs logo" style="margin-right: 10px;"
							src="assets/icons/checkmark-outline.svg" alt="Logo" width="15"
							height="15">
						Done
					</button>
				</div>
			</div>

			<!-- TODO: add ability to input audio -->
			<!-- Transcript card-->
			<div class="card p-s" style="flex: 2;">
				<div class=" flex" style="align-items: start;">
					<h style="margin-top: 8px;">Transcript</h>
					<div id="loader" class="loader"
						style="display: inline-block; margin-left: 5px;"></div>
				</div>

				<div class="mt-s" id="output"></div>
			</div>
		</div>

		<!-- History card -->
		<div class="card mt-s p-s">
			<!-- TODO: add download button -->
			<h>History</h>
			<div class="mt-s" id="history"></div>
		</div>
	</div>

	<script type="module" src="websocket.js"></script>
	<script type="module" src="index.js"></script>
</body>

</html>
