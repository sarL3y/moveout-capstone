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
    $('.jobs-count').empty();
    $('.jobs-count').append(`${newResults.length}`);

    for (let i = 0; i < newResults.length; i++) {
        console.log(newResults.forms);

        $('.forms-list').append(
            `<li>
                <div id="js-form-item" class="form-item" data-info=${i}>
                    <p class="item">${newResults[i].name.firstName} ${newResults[i].name.lastName}</p>
                    <span class="form-icons">EDIT</span>
                    <span class="form-icons">DELETE</span>
                </div>
                <div id="js-form-${i}" class="form-info hidden">
                    <div class="form-info-items">
                        <p>${newResults[i].email}</p>
                        <p>${newResults[i].phone}</p>
                        <p>${newResults[i].address}</p>
                        <p>$${newResults[i].monthlyRent}</p>
                        <p>${newResults[i].leaseRemainder}</p>
                        <p>${newResults[i].comments}</p>
                    </div>
                </div>
            </li>`
        );
    };
};

function getAndDisplay() {
    $('#js-show-forms').submit(event => {
        event.preventDefault();
        getForms(displayForms);
    });
};

function watchFormClick() {
    $('.forms-list').on('click', '#js-form-item', event => {
        console.log('clicking something');

        let formNum = $(event.currentTarget).data('info');
        console.log(formNum);

        let i = formNum.toString();
        console.log($(this).find(`#js-form-${i}`))

        if(!$(this).find('#js-form-' + i.replace('"', '')).hasClass('hidden')) {
            $(this).find('#js-form-' + i.replace('"', '')).addClass('hidden');
        } else {
            $(this).find('#js-form-' + i.replace('"', '')).removeClass('hidden');
        };
    });
};


$(watchFormClick);
$(getAndDisplay);