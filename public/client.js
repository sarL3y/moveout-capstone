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
            $('.forms-list').text(`Oops, something went wrong while returning results. ${err.message}.`);
        });
};

function sortForms(forms) {
    if (forms.length > 0) {
        console.log(forms[0].created);

        let sortedForms = forms.sort(function(a, b) { 
            let dateA = new Date(a.created);
            let dateB = new Date(b.created);
            console.log(dateA, dateB);

            return dateB - dateA;
        });

        return sortedForms;
    };
};

function displayForms(newResults) {

    $('.forms-list').empty();
    $('#js-error-message').empty();
    $('.jobs-count').empty();
    $('.jobs-count').append(`${newResults.length}`);

    sortForms(newResults);

    for (let i = 0; i < newResults.length; i++) {

        $('.forms-list').append(
            `<li>
                <div id="js-form-item" class="form-item" data-info=${i}>
                    <p class="item">${newResults[i].name.firstName} ${newResults[i].name.lastName}</p>
                    <button type="button" id="js-edit-btn" class="form-icons"><i class="material-icons">edit</i></button>
                    <button type="button" id="js-delete-btn" class="form-icons"><i class="material-icons">delete</i></button>
                </div>
                <div id="js-form-${i}" class="form-info hidden">
                    <div class="form-info-items">
                        <p>Email: ${newResults[i].email}</p>
                        <p>Phone: ${newResults[i].phone}</p>
                        <p>Address: ${newResults[i].address}</p>
                        <p>Monthly Rent: ${newResults[i].monthlyRent}</p>
                        <p>Lease Remainder: ${newResults[i].leaseRemainder}</p>
                        <p>Comments: ${newResults[i].comments}</p>
                        <p>Created: ${newResults[i].created}</p>
                    </div>
                </div>
            </li>`
        );
    };
};

function getAndDisplayForms() {
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

    $('.forms-list').on('click', '#js-edit-btn', event => {
        console.log('Editing form');
    });

    $('.forms-list').on('click', '#js-delete-btn', event => {
        console.log('Deleting form');
    });
};

$(watchFormClick);
$(getAndDisplayForms);