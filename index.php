<?php
include("views/head.php");

include("php/lock.php");
?>

<body class="w-full">
	<?php
	include("views/navbar.php");
	?>

	<div class="flex-col lg:mx-14">
		<!-- Input and trancript container -->
		<div class="flex flex-col gap-2 lg:flex-row h-[60%]">

			<!-- Input card-->
			<div class="card flex flex-col gap-2">
				<div class="flex head" style="align-items: start;">
					<h5 style="margin-top: 8px; margin-bottom: 4px;">Input</h5>
				</div>

				<div class="body">

					<!-- TODO: the icons should collapse if it overlapses with the width of the input card-->
					<div class="flex flex-wrap items-center gap-2 justify-between">
						<div class="flex items-center gap-2">
							<button id="importBtn" class="btn">
								<img class="mr-xs" src="assets/icons/send-outline.svg" alt="Logo" width="15" height="15">
								Import
								<input class="hidden" id="fileInput" name="file" type="file">
							</button>

							<!-- TODO: use session to save file input -->
							<button class="btn" disabled id="processBtn">
								<img class="mr-xs logo" width="15" height="15" class="mr-xs" src="assets/icons/color-wand-outline.svg" alt="Logo">
								Process
							</button>
							<button id="doneBtn" disabled class="btn">
								<img class="mr-xs logo" style="margin-right: 10px;" src="assets/icons/checkmark-outline.svg" alt="Logo" width="15" height="15">
								Save
							</button>
						</div>
					</div>

					<!-- Translate switch -->
					<div class="mt-4">
						<div x-data="{ switchOn: false }" class="flex items-center space-x-2">
							<input id="translateSwitch" type="checkbox" name="switch" class="hidden" :checked="switchOn">
							<button x-ref="switchButton" type="button" @click="switchOn = ! switchOn" :class="switchOn ? 'bg-blue-600' : 'bg-neutral-200'" class="relative inline-flex h-6 py-0.5 focus:outline-none rounded-full w-10" x-cloak>
								<span :class="switchOn ? 'translate-x-[18px]' : 'translate-x-0.5'" class="w-5 h-5 duration-200 ease-in-out bg-white rounded-full shadow-md"></span>
							</button>
							<label @click="$refs.switchButton.click(); $refs.switchButton.focus()" :id="$id('switch')" :class="{ 'text-blue-600': switchOn, 'text-neutral-700': ! switchOn }" class="text-sm font-medium  select-none" x-cloak>
								Translate
							</label>

						</div>
					</div>

				</div>

			</div>

			<!-- Transcript card-->
			<div class="card p-0 flex-1 h-[100%] overflow-clip flex flex-col" id="transcriptContainer">
				<div class="flex justify-between head">
					<div class="flex" style="align-items: start;">
						<h5 style="margin-top: 8px;">Transcript</h5>
						<div id="loader" class="loader" style="display: inline-block; margin-left: 5px;"></div>
					</div>

					<!-- TODO: can be extracted as a component -->
					<!-- TODO: move export button to the history card -->
					<button id="exportBtn" disabled class="flex items-end iconBtn rounded-full border-none">
						<img src="assets/icons/download-outline.svg" class="m-[8px]" alt="Logo" width="20" height="20">
					</button>
				</div>

				<div class="body overflow-auto block scroller">
					<div id="output">
					</div>
				</div>
			</div>

		</div>

		<!-- History card -->
		<div class="card mt-2 p-s h-[250px]">
			<!-- TODO: add download button -->
			<!-- TODO: if we click an edit button in the history we make a new view, where we can edit the transcript and view the video for an easy reference -->
			<div class="flex head" style="align-items: start;">
				<h5 style="margin-top: 8px; margin-bottom: 4px;">History</h5>
			</div>

			<div class="mt-2" id="history"></div>
		</div>
	</div>

	<script type="module" src="js/websocket.js"></script>
	<script type="module" src="js/index.js"></script>
</body>

</html>
