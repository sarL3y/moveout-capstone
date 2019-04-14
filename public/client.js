'use strict';

function getForms() {
    const FORMS = '/formsList';

    fetch(FORMS)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJson => displayForms(resJson))

        .catch(err => {
            $('#results-list').text(`Oops something went wrong while returning results. ${err.message}.`);
        });
};

function displayForms(newResults) {
    console.log(newResults);

    $('#results-list').empty();
    $('#js-error-message').empty();

    for (let i = 0; i < newResults.length; i++) {
        console.log(newResults.forms);

        $('#results-list').append(
            `<li role="listitem">
					<div class="form-item">
						<p class="item">${newResults[i].name.firstName} ${newResults[i].name.lastName}</p>
					</div>
                </li>`
        );
    }
};

function getAndDisplay() {
    $('#js-show-forms').submit(event => {
        event.preventDefault();
        getForms(displayForms);
    });
};

function watchFormClick() {
    $('.form-info').on('click', event => {
        let formItem = $(event.currentTarget).data('info');
        $();
    });
};

$(getAndDisplay);