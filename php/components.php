<?php
function checkBox(string $id, string $name, string $text)
{
        echo <<<HTML
        <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                        <input name="$name" id="$id" type="checkbox" class="w-4 h-4 rounded border-neutral-300 bg-neutral-50 focus:ring-3 focus:ring-blue-300" required>
                </div>
                <div class="ml-3 text-sm">
                        <label for="$id" class="text-neutral-900">$text</label>
                </div>
        </div>
        HTML;
}

function input(string $id, string $placeholder, string $type)
{
        echo <<<HTML
        <div class="w-full">
                <input name="$id" id="$id" type="$type" placeholder="$placeholder" class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        HTML;
}
