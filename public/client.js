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
        let sortedForms = forms.sort(function(a, b) { 
            let dateA = new Date(a.created);
            let dateB = new Date(b.created);

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
                        <button type="button" id="js-delete-btn" data-info=${newResults[i]._id} class="form-icons"><i class="material-icons">delete</i></button>
                </div>
                <div id="js-form-${i}" class="form-info hidden">
                    <div class="form-info-items">
                        <div class="items-top">
                            <p><span class="p-bold">Email</span> ${newResults[i].email}</p>
                            <p><span class="p-bold">Phone</span> ${newResults[i].phone}</p>
                        </div>
                        <div class="items-middle">
                            <p><span class="p-bold">Address</span> ${newResults[i].address}</p>
                            <p><span class="p-bold">Monthly Rent</span> ${newResults[i].monthlyRent}</p>
                        </div>
                        <div class="items-bottom">
                        <p><span class="p-bold">Lease Remainder</span> ${newResults[i].leaseRemainder}</p>
                        <p><span class="p-bold">Comments</span> ${newResults[i].comments}</p>
                        <p><span class="p-bold">Created</span> ${newResults[i].created}</p>
                        </div>
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

        let formNum = $(event.currentTarget).data('info');

        let i = formNum.toString();

        if(!$(this).find('#js-form-' + i.replace('"', '')).hasClass('hidden')) {
            $(this).find('#js-form-' + i.replace('"', '')).addClass('hidden');
        } else {
            $(this).find('#js-form-' + i.replace('"', '')).removeClass('hidden');
        };
    });
};

function deleteForm(formId) {
    const idToDelete = '/deleteForm/' + formId;

    fetch(idToDelete, { 
        method: "DELETE",
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        })
        .catch(err => {
            $('.forms-list').text(`Oops, something went wrong while trying to delete. ${err.message}.`);
        });
}

function watchDeleteBtn() {
    $('.forms-list').on('click', '#js-delete-btn', event => {
        event.stopPropagation();

        if (!confirm("Are you sure you want to delete this form?")) {
            event.preventDefault();
        } else {
            let formToDelete = $(event.currentTarget).data('info');
            console.log(formToDelete);

            // let idString = formToDelete.toString();
            // deleteForm(idString);

            deleteForm(formToDelete);

            setTimeout(function() {
                getForms(displayForms);
            }, 2000);
        };
    });
}

// function watchEditBtn() {
//     $('.forms-list').on('click', '#js-edit-btn', event => {
//         event.stopPropagation();
//         console.log('Editing form');
//     });
// }

// $(watchEditBtn);
$(watchDeleteBtn);
$(watchFormClick);
$(getAndDisplayForms);