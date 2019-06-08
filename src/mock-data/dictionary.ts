export const dictionary = {
    entries: {
        'election_title': 'Board Election',
        'election_logo': 'assets/EC_lightblue_logo.jpg',
        'election_icon': 'assets/EC_lightblue_icon.ico',
        'election_help': 'Help',
        'election_settings': 'Settings',
        'election_loading': 'Loading...',
        'ballot_summary': 'My Ballot',
        'ballot_endoflist': 'END OF LIST',
        'ballot_moreinfo': 'More info',
        'ballot_undervotetitle': 'Confirm Navigation',
        'ballot_undervotemessage': 'You haven\'t made all available selections. Would you still like to leave this position?',
        'ballot_undervotecancel': 'No',
        'ballot_undervoteaccept': 'Yes',
        'ballot_writein': 'Write-In',
        'ballot_blackoutmessage': '__BLACKOUT ENABLED__\n\nYour ballot has been hidden for privacy.',
        // ballot_valid warning
        'ballot_valid_warning_title': '#OOPS!',
        'ballot_valid_warning': 'It appears that you have only\n\ncompleted ONE of SIX positions\n\nof this ballot\n\n<br>' +
                                'Click __RETURN TO BALLOT__\n\nto continue voting:' ,
        'ballot_valid_return': 'RETURN TO BALLOT',
        'ballot_valid_warning_submit': '<br>Click __SUBMIT BALLOT__\n\nto finish voting and submit\n\nyour ballot:',
        'ballot_valid_submit': 'SUBMIT BALLOT',
        // ballot_invalid warning
        'ballot_invalid_warning_title': '#OOPS!',
        'ballot_invalid_warning': 'It appears that you have only\n\ncompleted ONE of SIX contest\n\nof this ballot\n\n<br>' +
                                'Click __RETURN TO BALLOT__\n\nto continue voting:' ,
        'ballot_invalid_return': 'RETURN TO BALLOT',
        // session warning
        'session_warning': 'Click __OK__ below to reset the\n\ntimer and continue this\n\nsession:',
        'session_warning_title': '#Your session\n\n#will end in 5\n\n#minutes.',
        'session_return': 'OK',
        // auth warning
        'auth_warning_title': '#OOPS!',
        'auth_warning': 'It appears that \n\nthe login information \n\nyou entered was incorrect.\n\n<br>' +
                        'Please click __TRY AGAIN__ \n\nto return to the login page.',
        'auth_return': 'TRY AGAIN',
        'auth_poweredbysrc': 'assets/powered-by.png',
        'auth_pre': 'To begin the voting process, enter your 8 digit Personal Identification Number (PIN) ' +
                    'and the last 4 digits of your Social Security Number.',
        'auth_0_label': 'PIN (required)',
        // 'auth_0_help': 'Usernames should be between __four__ and __64__ characters in length.',
        'auth_1_label': 'Last 4 Digits of Social Security number (required)',
        // 'auth_1_help': 'Passwords should be between __six__ and __64__ characters in length.',
        'auth_2_label': 'Enter your Date of Birth',
        // 'auth_2_help': 'PINs should contain __four__ numbers with __no letters or symbols__ (!, *, #, ...).',
        'auth_submit': 'LOG IN',
        'help_header': 'Help',
        'help_text': 'For assistance with your ballot, please contact the Everyone Counts Help Desk at 123-456-7890. ' +
                    'The Help Desk is available 24 hours a day, 7 days a week.\n\n',
        'help_return': 'RETURN TO BALLOT',
        'settings_header': 'Settings',
        'settings_back': 'Back',
        'settings_authreturn': 'RETURN TO LOGIN',
        'settings_ballotreturn': 'RETURN TO BALLOT',
        'settings_textsize': 'Text Size',
        'settings_textsizesub': 'Adjust Text Size',
        'settings_smalltext': 'Small',
        'settings_normaltext': 'Medium',
        'settings_largetext': 'Large',
        'settings_xsmalltext': 'Smaller',
        'settings_xlargetext': 'Larger',
        'settings_exampletext': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit tellus, mattis ' +
                                'eget ultrices a, elementum pulvinar arcu. Maecenas ultricies lorem augue, non ' +
                                'efficitur enim facilisis at. Mauris eros augue, tristique a hendrerit ac, hendrerit ' +
                                'ac massa. Nunc sagittis pretium urna nec malesuada. Suspendisse et pharetra est. Sed ' +
                                'purus sapien, viverra at eleifend et, ullamcorper eget metus. Sed vestibulum porttitor ' +
                                'arcu. Aliquam ultrices diam in est mollis, non interdum purus dapibus. Integer ' +
                                'tristique cursus auctor. Vivamus volutpat pellentesque ligula, ut efficitur neque ' +
                                'vehicula vel. Ut eleifend venenatis risus, nec fringilla metus porttitor ut. Aenean eu ' +
                                'mauris at nunc suscipit suscipit. Praesent vel elit ante.',
        'settings_exampletexttitle': 'Sample Text',
        'settings_contrast': 'Contrast',
        'settings_contrastsub': 'Select a Contrast',
        'settings_normalcontrast': 'Normal',
        'settings_bowcontrast': 'Black text on white',
        'settings_wobcontrast': 'White text on black',
        'settings_blackout': 'Blackout',
        'settings_blackoutsub': 'Blackout',
        'settings_blackouthelp': 'Tap/click the icon below to turn blackout',
        'settings_blackoutoff': 'OFF',
        'settings_blackouton': 'ON',
        'settings_blackoutstatus': 'Blackout is',
        'settings_reset': 'RESET',
        'settings_resetall': 'RESET ALL',
        'review_title': 'VOTE SUMMARY',
        'review_submit': 'SUBMIT',
        'review_message': 'Review your selection for each position. To make changes select __Change Selection__ at the bottom of ' +
                'each position. Select the __submit__ button to complete your voting session.\n\nOnce you\'ve submitted your ballot ' +
                'you cannot make additional changes.',
        // review inline-warning
        'review_undervotewarning': 'You may still make more selections for this contest. Select __Change Selection__ to go back to ' +
                                'this contest and make more selections.',
        'review_writeinwarning': 'Your vote will be counted, but you left your write-in selection blank.',
        'review_changeselection': 'CHANGE SELECTION',
        'review_confirmtitle': 'Confirm submission',
        'review_confirmmessage': 'Your vote will be submitted. Are you sure you want to continue?',
        'review_confirmaccept': 'Yes',
        'review_confirmcancel': 'No',
        'summary_title': 'My Ballot',
        'summary_message': 'To vote on a position or change a selection, select a position\'s title below.',
        'summary_completed': 'Completed',
        'summary_showall': 'Show all selections',
        'summary_hideall': 'Hide all selections',
        'summary_review': 'REVIEW MY BALLOT',
        'contest_contest0_pre': '#Success!\n\nYour PIN and the last 4 digits of your Social Security number have been accepted, ' +
                                'and you are now logged in.\n\n' +
                                'Select __Start Voting__ below to access the first contest in your ballot. Or go directly to any ' +
                                'contest by using the My Ballot navigation bar.\n\nIf you need help, select __Help__ in the menu bar.',
        'contest_contest0_next': 'Start Voting',
        'contest_contest1_title': 'Position A',
        'contest_contest1_pre': 'Vote for __ONE__',
        'contest_contest1_selected': 'Selected',
        'contest_contest1_previous': 'Return to Start',
        'contest_contest1_next': 'Next Position',
        'contest_contest2_title': 'Position B',
        'contest_contest2_pre': 'Vote for __ONE__',
        'contest_contest2_selected': 'Selected',
        'contest_contest2_previous': 'Previous Position',
        'contest_contest2_next': 'Vote Summary',
        'choice_moreinfo': 'View Candidate Statement',
        'choice_return': 'RETURN TO POSITION',
        'choice_contest1choice0_title': 'John Doe',
        'choice_contest1choice0_group': 'Yellow Party',
        'choice_contest1choice0_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**John Doe**\n\n' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'choice_contest1choice1_title': 'Lisa Banks',
        'choice_contest1choice1_group': 'Orange Party',
        'choice_contest1choice1_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**Lisa Banks**\n\n' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'choice_contest1choice2_title': 'Jack Smith',
        'choice_contest1choice2_group': 'Brown Party',
        'choice_contest1choice2_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**Jack Smith**\n\n' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'choice_contest1choice3_title': 'Mary Jones',
        'choice_contest1choice3_group': 'Grey Party',
        'choice_contest1choice3_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**Mary Jones**\n\n**' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'choice_contest1choice4_title': 'Henry Brown',
        'choice_contest1choice4_group': 'Green Party',
        'choice_contest1choice4_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**Henry Brown**\n\n**' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'choice_contest2choice0_title': 'James Stuart',
        'choice_contest2choice0_group': 'Orange Party',
        'choice_contest2choice0_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**James Stuart**\n\n' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'choice_contest2choice1_title': 'Kelly Grace',
        'choice_contest2choice1_group': 'Yellow Party',
        'choice_contest2choice1_details': '<center>**SAMPLE**</center>\n<center>**CANDIDATE STATEMENT**</center>\n\n---\n\n' +
                                        '**Kelly Grace**\n\n' +
                                        'Laborro que veles eliberovit, ' +
                                        'conem fugiam quundio rehenis dolorib ustinci anderibus.Me namus ut aces ' +
                                        'maximod quiatur, con esequiat auda nonsed que aut odit eicta eic tem ' +
                                        'voluptat. Obit voluptatur sed maionem fugiatatus, commodit es et aut ' +
                                        'que cum ad ut doluptatur modictas remostempora volupta plit reperest eum ' +
                                        'et dolo ipis quiaesc ipieni sitiam ressin pariae. Unt quam dicatios ' +
                                        'dolecepera is atem eaquo doluptatur, odioris ma vernamusdae nus doluptatur ' +
                                        'maioria evelliquame etur sapitatem rerferumeni assimag nisciminiet lit, ' +
                                        'officiet quiassum latur? Em. Adignis cus, aute essedig nianis id ut velit ut.' +
                                        '\n\nExceatem dolorro quis estiatia simusci   \nodis porumendant, consed ' +
                                        'quisim fuga. Ullit ipsamet voloreptae molorit explanda porerore non conseque ' +
                                        'namus ad estrum re ma pror sae gaca. Vid quam volupta tibus eos.\n\n' +
                                        'Nimeniam que pre simodis simintene modi dolupta tendel eum que non pariorro ' +
                                        'comnime nihitatur molum quo maion con reri blaborro is am que quibus ma cum ' +
                                        'faccum lam quo beritistiam faces voluptae latium nia voluptatiis etus.\n\n' +
                                        'Ut iurepro voles moluptaecte nonsendem   \nRatest, occaborem sum, untur adicati ' +
                                        'odist que nos prestiae posandit et quae con preribus.Endicae prae non porum ' +
                                        'electem sita volorem. Ribus cum volum sundae estrumquodis aut exceaqui berchit, ' +
                                        'et labo. Nam volo desciissitia sam eosamus nobitia nullandit, eum imperia ' +
                                        'aspelitatem ea eum ipsam cus eum aut is dolor acepel ma nate non ellande\n\n' +
                                        'Liquid ea quamus, oditiae volut et volorem   \nLandi sum et ipit volupiet qui ' +
                                        'ditatempor adit fugitatur? Rum reicia cumquam quas maio oluptati am quod que ' +
                                        'veles eiustis inimporem\n\neicitium et harchicid magnam eicaboresto voluptam ' +
                                        'quibus consed eum cumquo molendi dolo es rernat.\n\nEt magniam et erum ' +
                                        'accuptibus ne pellabor Aut faciis nestrum quas am iducia doloribus coritiuri ' +
                                        'dolorestios asperestium ilit id que si blabo. Itatis magnam, optatentiore corestet, ' +
                                        'et vendant, sit, quideliquam autem labo. Et lab ipist, iuremqu istiat utemporunt ' +
                                        'aspelic aborend itempellant aut nate exceaqui.',
        'finish_message': '# Congratulations!\n\nYour vote has been submitted.',
        'finish_logout': 'LOG OUT'
    }
};
