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

    $('.forms-list').empty();
    $('#js-error-message').empty();
    $('.jobs-count').append(
        `${newResults.length}`
    );

    for (let i = 0; i < newResults.length; i++) {
        console.log(newResults.forms);

        $('.forms-list').append(
            `<li>
            <div class="form-item">
                <p class="item">${newResults[i].name.firstName} ${newResults[i].name.lastName}</p>
                <span class="form-icons">EDIT</span>
                <span class="form-icons">DELETE</span>
                    <div class="form-info data-info=${i} hidden">
                        <div class="form-info-item">
                            <p>${newResults[i].email}</p>
                            <p>${newResults[i].phone}</p>
                            <p>${newResults[i].address}</p>
                            <p>${newResults[i].monthlyRent}</p>
                            <p>${newResults[i].leaseRemainder}</p>
                            <p>${newResults[i].comments}</p>
                        </div>
                    </div>
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