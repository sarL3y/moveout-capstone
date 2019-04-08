'use strict';

function displayForms(newResults) {
    $('#results-list').empty();
    $('#js-error-message').empty();

    for (let i = 0; i < newResults.forms.length; i++) {
        $('#results-list').append(
            `<li role="listitem">
					<div class="items">
						<p class="item">${newResults.forms[i].name}</p>
					</div>
                </li>`
        );
    }
};

function watchGetFormsButton() {
    $('form').submit(event => {
        event.preventDefault();
    });
};