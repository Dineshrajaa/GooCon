/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        console.log("Device Ready");
    },
    // Update DOM on a Received Event
    synContact: function(token) {
        // To Syn Google Contact
        $.ajax({
            url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json',
            dataType: 'jsonp',
            data: token
        }).done(function(data) {
            alert(JSON.stringify(data));
        });
    },
    authorizeApp: function() {
        // Authourize Google
        window.plugins.googleplus.login({
                'scopes': 'https://www.google.com/m8/feeds', // optional space-separated list of scopes, the default is sufficient for login and basic profile info
                'offline': true
            },
            function(obj) {
                alert(JSON.stringify(obj)); // do something useful instead of alerting
                app.synContact(obj.oauthToken);
            },
            function(msg) {
                alert('error: ' + msg);
            }
        );
    }
};

app.initialize();
